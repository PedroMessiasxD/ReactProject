// Services/Usuarios.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsuarios = async (token, page, pageSize) => {
  if (!token) {
    throw new Error("Token não fornecido");
  }

  const response = await axios.get("https://localhost:7287/api/Admin/usuarios", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const useFetchUsuarios = (token, page, pageSize, options = {}) => {
  return useQuery({
    queryKey: ["usuarios", page],
    queryFn: () => fetchUsuarios(token, page, pageSize),
    enabled: !!token,
    keepPreviousData: true,
    ...options,
  });
};