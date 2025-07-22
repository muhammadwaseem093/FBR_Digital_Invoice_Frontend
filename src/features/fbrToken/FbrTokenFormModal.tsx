import FbrTokenForm from "../../components/FbrTokenForm";

const FbrTokenFormModal = ({
  onClose,
  existingToken,
  tokenId,
}: {
  onClose: () => void;
  existingToken?: string;
  tokenId?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow w-[400px]">
        <FbrTokenForm existingToken={existingToken} tokenId={tokenId} />
        <button className="mt-4 text-red-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FbrTokenFormModal;
