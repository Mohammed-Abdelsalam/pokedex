import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UsePageValidationProps } from "../types";

export const usePageValidation = ({
  currentPage,
  totalPages,
  isLoading,
  isError,
}: UsePageValidationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // handle loading and error states
    if (isLoading || isError || totalPages === 0) return;

    // handle invalid page numbers
    if (currentPage < 1 || currentPage > totalPages) {
      navigate("/404", { replace: true });
    }
  }, [currentPage, totalPages, isLoading, isError, navigate]);

  // returns true if the page is valid
  const isValidPage =
    !isLoading &&
    !isError &&
    totalPages > 0 &&
    currentPage >= 1 &&
    currentPage <= totalPages;

  return { isValidPage };
};
