import React, { useState } from "react";
import AdminList from "../../components/AdminList";
import EditorForm from "../../components/EditorForm";
import Header from "../../components/Header";
import { useContentData } from "../../utils/useContentData";

const TABS = [
  { key: "news", label: "Новости" },
  { key: "portfolio", label: "Портфолио" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news");
  const [editing, setEditing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const { items, loading, refetch } = useContentData(activeTab);

  async function fetchAll() {
    await refetch();
    setShowEditor(false);
    setEditing(null);
  }

  function handleEdit(item) {
    setEditing(item);
    setShowEditor(true);
  }
  function handleCreate() {
    setEditing(null);
    setShowEditor(true);
  }
  async function handleDelete(folder_name) {
    try {
      const response = await fetch(`/api/${activeTab}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_name })
      });
      if (response.ok) {
        fetchAll();
        return;
      }
    } catch (error) {
      console.log("API delete failed, using localStorage fallback");
      // Fallback to localStorage
      const localData = localStorage.getItem(`admin_${activeTab}`);
      if (localData) {
        let items = JSON.parse(localData);
        items = items.filter(item => item.folder_name !== folder_name);
        localStorage.setItem(`admin_${activeTab}`, JSON.stringify(items));
        fetchAll();
      }
    }
  }

  async function handleSave(obj) {
    const method = editing ? "PUT" : "POST";
    try {
      const response = await fetch(`/api/${activeTab}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(obj)
      });
      if (response.ok) {
        fetchAll();
        return;
      }
    } catch (error) {
      console.log("API save failed, using localStorage fallback");
    }

    // Fallback to localStorage
    try {
      const localData = localStorage.getItem(`admin_${activeTab}`);
      let items = localData ? JSON.parse(localData) : [];

      if (editing) {
        // Update existing item
        const index = items.findIndex(item => item.folder_name === editing.folder_name);
        if (index !== -1) {
          items[index] = obj;
        }
      } else {
        // Add new item
        items.push(obj);
      }

      localStorage.setItem(`admin_${activeTab}`, JSON.stringify(items));
      fetchAll();
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.log('localStorage is full, clearing all data');
        // Clear all localStorage
        localStorage.clear();
        try {
          localStorage.setItem(`admin_${activeTab}`, JSON.stringify([obj]));
          fetchAll();
        } catch (e) {
          console.log('Still cannot save to localStorage');
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-10 px-2">
        <div className="flex gap-6 mb-8 justify-center">
          {TABS.map(t => (
            <button key={t.key}
              className={`text-lg px-6 py-2 rounded-t bg-white shadow ${activeTab === t.key ? "border-b-4 border-blue-500 font-bold" : "opacity-70"}`}
              onClick={() => setActiveTab(t.key)}
            >{t.label}</button>
          ))}
        </div>
        {!showEditor ? (
          <AdminList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            type={activeTab}
          />
        ) : (
          <EditorForm initialData={editing} onSave={handleSave} type={activeTab} />
        )}
        {loading && <div className="text-center mt-10">Загрузка...</div>}
      </div>
    </div>
  );
}
