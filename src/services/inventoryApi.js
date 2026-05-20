// Базовий URL бекенду — змінити коли буде реальний сервер
const BASE_URL = 'http://localhost:3001';

// ── GET /inventory ──────────────────────────────────────────
export const getInventory = async () => {
  const res = await fetch(`${BASE_URL}/inventory`);
  if (!res.ok) throw new Error(`Помилка завантаження інвентарю: ${res.status}`);
  return res.json();
};

// ── GET /inventory/:id ──────────────────────────────────────
export const getInventoryById = async (id) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`);
  if (!res.ok) throw new Error(`Інвентар #${id} не знайдено: ${res.status}`);
  return res.json();
};

// ── POST /register (multipart/form-data) ───────────────────
export const createInventory = async ({ inventory_name, description, photo }) => {
  const formData = new FormData();
  formData.append('inventory_name', inventory_name);
  if (description) formData.append('description', description);
  if (photo) formData.append('photo', photo);

  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    body: formData,
    // Content-Type не встановлюємо вручну — браузер сам додає boundary
  });
  if (!res.ok) throw new Error(`Помилка створення: ${res.status}`);
  return res.json();
};

// ── PUT /inventory/:id (JSON) ───────────────────────────────
export const updateInventory = async (id, { inventory_name, description }) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inventory_name, description }),
  });
  if (!res.ok) throw new Error(`Помилка оновлення #${id}: ${res.status}`);
  return res.json();
};

// ── PUT /inventory/:id/photo (multipart/form-data) ──────────
export const updateInventoryPhoto = async (id, photo) => {
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await fetch(`${BASE_URL}/inventory/${id}/photo`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) throw new Error(`Помилка оновлення фото #${id}: ${res.status}`);
  return res.json();
};

// ── DELETE /inventory/:id ───────────────────────────────────
export const deleteInventory = async (id) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Помилка видалення #${id}: ${res.status}`);
};