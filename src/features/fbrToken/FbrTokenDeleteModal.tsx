import { deleteFbrToken } from "../../api/fbrTokenApi";

const FbrTokenDeleteModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const handleDelete = async () => {
    await deleteFbrToken(id);
    onClose();
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <p>Are you sure you want to delete this token?</p>
      <div className="mt-4 flex gap-2">
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Delete</button>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default FbrTokenDeleteModal;
