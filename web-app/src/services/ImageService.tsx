export default class ImageService {
  static validateAndConvertImageToBase64 = (file: any, callback: any) => {
    // Valider le type MIME de l'image
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      callback(
        "Veuillez sélectionner une image au format JPG, JPEG ou PNG.",
        null
      );
      return;
    }

    // Valider la taille maximale de l'image (1000x1000 pixels)
    const maxDimensions = { width: 1000, height: 1000 };
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      if (
        image.width > maxDimensions.width ||
        image.height > maxDimensions.height
      ) {
        callback(
          "L'image ne doit pas dépasser 1000px de longeur ou largeur.",
          null
        );
        return;
      }

      // Valider le poids maximal de l'image (1 Mo)
      const maxSize = 1024 * 1024; // 1 Mo
      if (file.size > maxSize) {
        callback(
          "La taille de l'image dépasse la limite autorisée.(1Mo)",
          null
        );
        return;
      }

      // Convertir l'image en base64
      const reader = new FileReader();
      reader.onload = () => {
        callback(null, reader.result);
      };
      reader.onerror = () => {
        callback(
          "Une erreur s'est produite lors de la conversion de l'image en base64.",
          null
        );
      };
      reader.readAsDataURL(file);
    };

    image.onerror = () => {
      callback(
        "Une erreur s'est produite lors du chargement de l'image.",
        null
      );
    };
  };
}