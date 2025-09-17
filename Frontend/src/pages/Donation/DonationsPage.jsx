// src/pages/Donations/DonationPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaDonate } from "react-icons/fa";
import { getCampaignById } from "../../slices/campaignSlice"; // adjust path if needed
import { makeDonation } from "../../slices/donationSlice"; // adjust path if needed

const quickAmounts = [100, 500, 1000, 5000];

const DonationPage = () => {
  const { id } = useParams(); // campaign id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // campaign state
  const {
    currentCampaign: campaign,
    loading: campaignLoading,
    error: campaignError,
  } = useSelector((state) => state.campaign);

  // donation state
  const { loading: donationLoading, error: donationError } = useSelector(
    (state) => state.donations
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { amount: "" },
  });

  useEffect(() => {
    if (id) dispatch(getCampaignById(id));
  }, [dispatch, id]);

  const onSubmit = async (formData) => {
    try {
      // call makeDonation thunk - it should return { donation, certificate }
      const payload = await dispatch(
        makeDonation({ campaignId: id, amount: Number(formData.amount) })
      ).unwrap();

      // navigate to success page and pass payload via state
      navigate("/donations/success", {
        state: { donation: payload.donation, certificate: payload.certificate },
      });
    } catch (err) {
      // thunk rejection: error handled in slice; optionally show toast
      console.error("Donation failed:", err);
    }
  };

  if (campaignLoading)
    return <p className="text-center mt-8">Loading campaign...</p>;
  if (campaignError)
    return (
      <p className="text-center text-red-500 mt-8">Error: {campaignError}</p>
    );
  if (!campaign) return <p className="text-center mt-8">Campaign not found</p>;

  const isActive = campaign.status === "active";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {campaign.images?.[0]?.url && (
          <img
            src={campaign.images[0].url}
            alt={campaign.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-gray-600 mb-4">{campaign.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Goal</p>
                <p className="text-lg font-semibold">₹{campaign.goalAmount}</p>

                <p className="text-sm text-gray-600 mt-3">Raised</p>
                <p className="text-lg font-semibold">
                  ₹{campaign.raisedAmount}
                </p>

                <div className="w-full bg-gray-200 h-2 mt-3 rounded-full">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: `${campaign.progressPercentage || 0}%`,
                    }}
                  />
                </div>

                <p className="text-xs mt-2 text-gray-500">
                  {campaign.progressPercentage || 0}% raised •{" "}
                  {campaign.remainingDays >= 0
                    ? `${campaign.remainingDays} days left`
                    : "Ended"}
                </p>
              </div>
            </div>

            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 bg-white"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Donate Amount (₹)
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    {...register("amount", { required: true, min: 1 })}
                    placeholder="Enter amount"
                    className="flex-1 border rounded-lg px-3 py-2"
                    disabled={!isActive || donationLoading}
                  />
                  <button
                    type="submit"
                    disabled={!isActive || donationLoading}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaDonate />
                    {donationLoading ? "Processing..." : "Donate"}
                  </button>
                </div>

                <div className="flex gap-2 mt-1">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setValue("amount", amt)}
                      className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                {!isActive && (
                  <p className="text-sm text-red-500 mt-2">
                    This campaign is not active.
                  </p>
                )}

                {donationError && (
                  <p className="text-sm text-red-500">{donationError}</p>
                )}
              </form>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/campaigns")}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Browse Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
