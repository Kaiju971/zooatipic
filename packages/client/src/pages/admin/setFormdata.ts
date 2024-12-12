import { MAX_SIZE_IMAGE, MIN_SIZE_IMAGE } from "../../constants";
import { UserRoles } from "../../constants/roles";

interface FormValues {
  [key: string]: any;
}

export const setFormData = (data: FormData | FormValues, fields: string[]) => {
  const formData = new FormData();

  const isFormData = data instanceof FormData;

  fields.forEach((field) => {
    let value: any;

    if (isFormData) {
      value = data.get(field);
    } else {
      value = data[field];
    }

    if (field === "avatar" && value) {
      validateFile(value as File, formData);
    } else if (field === "role") {
      const roleValue = value?.toString().toUpperCase();
      const roleIndex = roleValue
        ? Object.keys(UserRoles).indexOf(roleValue) + 1
        : 3;
      formData.append("id_role", roleIndex.toString());
    } else if (value !== undefined && value !== null) {
      formData.append(field, value.toString());
    }
  });

  return formData;
};

const validateFile = (fileData: File, formData: FormData) => {
  const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];

  if (fileData.size < MIN_SIZE_IMAGE) {
    throw new Error("The file is too small");
  } else if (fileData.size > MAX_SIZE_IMAGE) {
    throw new Error("The file is too large");
  } else if (!allowedFileTypes.includes(fileData.type)) {
    throw new Error("The type of file is not valid");
  } else {
    formData.append("file", fileData);
  }
};
