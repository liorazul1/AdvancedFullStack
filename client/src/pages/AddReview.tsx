import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";

import api from "../services/api";


function AddReview() {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

    if (!id) {
    return <p>Restaurant not found</p>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();


    if (rating === 0) {
      setError("Please select a rating");
      return;
    }


    try {

      setLoading(true);
      setError("");


      await api.post("/reviews", {
        restaurant: id,
        rating,
        comment
      });


      navigate(`/restaurants/${id}`);


    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Failed to submit review"
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">


      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10">


        <h1 className="text-4xl font-black text-[#2d2d2d] mb-3">
          Rate This Restaurant
        </h1>


        <p className="text-lg text-[#2d2d2d]/50 font-medium mb-8">
          Share your experience with others
        </p>



        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >



          {/* Rating */}

          <div>

            <label className="block text-sm font-black uppercase tracking-wider mb-4 text-[#2d2d2d]">
              Your Rating
            </label>


            <div className="flex gap-3">


              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="hover:scale-110 transition-transform"
                >

                  <Star
                    className="w-10 h-10"
                    fill={
                      star <= rating
                        ? "#FF5733"
                        : "transparent"
                    }
                    style={{
                      color:
                        star <= rating
                          ? "#FF5733"
                          : "#2d2d2d40"
                    }}
                  />

                </button>

              ))}


            </div>

          </div>





          {/* Comment */}

          <div>


            <label className="block text-sm font-black uppercase tracking-wider mb-3 text-[#2d2d2d]">
              Comment
            </label>


            <textarea

              value={comment}

              onChange={(e) =>
                setComment(e.target.value)
              }

              placeholder="Tell others about your experience..."

              className="w-full min-h-40 px-6 py-5 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733] transition-all resize-none text-[#2d2d2d] font-medium"

            />

          </div>





          {error && (

            <p className="text-red-500 font-medium text-center">
              {error}
            </p>

          )}




          <button

            type="submit"

            disabled={loading}

            className="w-full px-8 py-5 bg-[#FF5733] text-white font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"

          >

            {loading ? "Submitting..." : "Submit Review"}

          </button>




        </form>


      </div>


    </div>

  );

}


export default AddReview;