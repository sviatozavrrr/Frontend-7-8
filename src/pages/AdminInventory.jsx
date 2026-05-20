import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import ConfirmModal from '../components/inventory/ConfirmModal';
import styles from './AdminInventory.module.css';

export default function AdminInventory() {
  const { inventory, deleteItem } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteItem(itemToDelete);
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className={styles.container}>
      <h1>Адмінка Інвентарю</h1>

      <Link to="/create" className={styles.addButton}>
        + Додати інвентар
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Фото</th>
            <th className={styles.th}>Назва</th>
            <th className={styles.th}>Опис</th>
            <th className={styles.th}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan={4} className={`${styles.td} ${styles.empty}`}>
                📦 Інвентар порожній — додай перший елемент
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>
                  <img src={item.photo} alt={item.inventory_name} className={styles.preview} />
                </td>
                <td className={styles.td}>{item.inventory_name}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Link to={`/inventory/${item.id}`}>
                      <button className={styles.btnView}>Переглянути</button>
                    </Link>
                    <Link to={`/edit/${item.id}`}>
                      <button className={styles.btnEdit}>Редагувати</button>
                    </Link>
                    <button className={styles.btnDelete} onClick={() => handleDeleteClick(item.id)}>
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}