import NGOForm from "../../components/ngos/NGOForm";
import { useDispatch, useSelector } from "react-redux";
import { updateNGO } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";

const EditNGOPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedNGO } = useSelector((state) => state.ngo);

  const handleSubmit = (data) => {
    dispatch(updateNGO({ id, data }));
    navigate("/ngos");
  };

  if (!selectedNGO) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit NGO</h1>
      <NGOForm initialData={selectedNGO} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditNGOPage;
