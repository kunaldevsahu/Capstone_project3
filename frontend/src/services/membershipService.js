import api from "./api";

export const buyMembership = (data) =>
  api.post("/membership/buy", {
    planId: data.planId,
    paymentMethod: data.paymentMethod || "UPI",
  });
