import { useState } from "react";
import { saveFbrToken, updateFbrToken } from "../api/fbrTokenApi";

const FbrTokenForm = ({ existingToken = "", tokenId }: { existingToken?: string, tokenId?: string }) => {
  const [token, setToken] = useState(existingToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tokenId) {
        await updateFbrToken(tokenId, token);
        alert("Token updated!");
      } else {
        await saveFbrToken(token);
        alert("Token saved!");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Error saving token");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        FBR Token:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {tokenId ? "Update Token" : "Save Token"}
      </button>
    </form>
  );
};

export default FbrTokenForm;
