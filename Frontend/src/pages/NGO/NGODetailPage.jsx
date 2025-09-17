import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNGOById } from "../../redux/slices/ngoSlice";

const NGODetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedNGO, loading } = useSelector((state) => state.ngo);

  useEffect(() => {
    dispatch(fetchNGOById(id));
  }, [dispatch, id]);

  if (loading || !selectedNGO) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold">{selectedNGO.organizationName}</h1>
      <p className="text-gray-700 mt-2">{selectedNGO.description}</p>
      <p className="mt-3">
        <strong>Email:</strong> {selectedNGO.contactEmail}
      </p>
      <p>
        <strong>Phone:</strong> {selectedNGO.contactPhone}
      </p>
    </div>
  );
};

export default NGODetailPage;
