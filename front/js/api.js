// Ensemble de fonctions permettant de requêter l'API

// Variables et constantes
const URL_API = "http://localhost:3000/api/products/";

/**
 * Permet de récupérer les produits via l'API par la méthode GET 
 * l'url : http://localhost:3000/api/products/
 * @returns {Promise} products
 */
async function getAllProducts() {
    try {
        // Récupération de la réponse de l'API après le GET
        let response = await fetch(URL_API);
        // Transformation la réponse en json
        let products = await response.json();

        return products;
    } catch (error) {
        console.error(`Une erreur est survenue : ${error.message}`);
    }
}
/**
 * Permet de récupérer un produit en fonction de son id
 * @param {string} id 
 * @returns {Promise} product
 */
async function getOneProduct(_id) {
    try {
        const response = await fetch(URL_API + `${_id}`);

        let product = await response.json();
        return product;
    } catch (error) {
        console.error(`Une erreur est survenue : ${error.message}`);
    }
}


export { getAllProducts, getOneProduct};