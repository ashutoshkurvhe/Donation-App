import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNGOs } from "../../redux/slices/ngoSlice";
import NGOCard from "../../components/ngo/NGOCard";

const NGOsPage = () => {
  const dispatch = useDispatch();
  const { ngos, loading } = useSelector((state) => state.ngo);

  useEffect(() => {
    dispatch(fetchNGOs());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">NGOs</h1>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ngos.map((ngo) => (
          <NGOCard key={ngo._id} ngo={ngo} />
        ))}
      </div>
    </div>
  );
};

export default NGOsPage;
