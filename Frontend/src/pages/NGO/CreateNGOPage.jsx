import NGOForm from "../../components/ngos/NGOForm";
import { useDispatch } from "react-redux";
import { createNGO } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const CreateNGOPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(createNGO(data));
    navigate("/ngos");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create NGO</h1>
      <NGOForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNGOPage;
