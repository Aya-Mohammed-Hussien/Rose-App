interface UpdateCategoryError {
  error: string;
}

interface UpdateCategorySuccess {
  success: true;
  message: string;
  category: CategoryData;
}

interface UpdateCategoryFailure {
  success?: false;
  error: string;
}

export type UpdateCategoryResult = UpdateCategorySuccess | UpdateCategoryFailure;
