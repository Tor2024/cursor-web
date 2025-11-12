import React from "react";

export default function AdminList({ items, onEdit, onDelete, onCreate, type }) {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{type === 'news' ? 'Новости' : 'Портфолио'}</h2>
        <button onClick={onCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Добавить</button>
      </div>
      {!items || items.length === 0 ? (
        <div className="text-gray-500 text-center py-10">Публикаций пока нет</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.folder_name} className="border p-4 rounded-xl bg-white flex gap-4 items-center shadow">
              {item.cover && <img src={item.cover} alt="cover" className="w-16 h-16 object-cover rounded" />}
              <div className="flex-1">
                <div className="font-semibold">{item.title?.ru || item.title?.en || "(без названия)"}</div>
                <div className="text-gray-500 text-sm">{item.date}</div>
              </div>
              <button
                onClick={() => onEdit(item)}
                className="px-3 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
              >
                Редактировать
              </button>
              <button
                onClick={() => onDelete(item.folder_name)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
