import { FaGlobe, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const NGOCard = ({ ngo }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-gray-800">
        {ngo.organizationName}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-3">{ngo.description}</p>

      <div className="mt-2 text-sm space-y-1">
        <p className="flex items-center gap-2 text-gray-700">
          <FaEnvelope className="text-blue-500" /> {ngo.contactEmail}
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          <FaPhoneAlt className="text-green-500" /> {ngo.contactPhone}
        </p>
        {ngo.website && (
          <a
            href={ngo.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaGlobe /> Website
          </a>
        )}
      </div>

      <span
        className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium ${
          ngo.status === "approved"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {ngo.status}
      </span>
    </div>
  );
};

export default NGOCard;
