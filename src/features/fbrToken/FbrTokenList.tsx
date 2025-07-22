import { useEffect, useState } from "react";
import { getFbrToken } from "../../api/fbrTokenApi";
import FbrTokenFormModal from "./FbrTokenFormModal";
import FbrTokenDeleteModal from "./FbrTokenDeleteModal";

interface FbrToken {
  id: string;
  user_id: string;
  token: string;
}

const FbrTokenList = () => {
  const [tokens, setTokens] = useState<FbrToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<FbrToken | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadTokens = async () => {
    const data = await getFbrToken();
    setTokens(data);
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">FBR Tokens</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedToken(null);
            setShowForm(true);
          }}
        >
          + Add Token
        </button>
      </div>

      <table className="w-full border text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Token</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.token}</td>
              <td className="border p-2">{t.user_id}</td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => { setSelectedToken(t); setShowForm(true); }} className="text-blue-600">Edit</button>
                <button onClick={() => setDeleteId(t.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <FbrTokenFormModal
          onClose={() => {
            setShowForm(false);
            setSelectedToken(null);
            loadTokens();
          }}
          existingToken={selectedToken?.token}
          tokenId={selectedToken?.id}
        />
      )}

      {deleteId && (
        <FbrTokenDeleteModal
          id={deleteId}
          onClose={() => {
            setDeleteId(null);
            loadTokens();
          }}
        />
      )}
    </div>
  );
};

export default FbrTokenList;
