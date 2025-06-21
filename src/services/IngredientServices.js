import firestore from '@react-native-firebase/firestore';

class IngredientServices {
    // Create a new ingredient
    async createIngredient(ingredient) {
        try {
            const response = await firestore().collection('ingredients').add(ingredient);
            return response.id;
        } catch (error) {
            console.error('Error creating ingredient:', error);
            throw error;
        }
    }

    // Read an ingredient by ID
    async getIngredientById(id) {
        try {
            const document = await firestore().collection('ingredients').doc(id).get();
            if (document.exists) {
                return { id: document.id, ...document.data() };
            } else {
                throw new Error('Ingredient not found');
            }
        } catch (error) {
            console.error('Error fetching ingredient:', error);
            throw error;
        }
    }

    // Read all ingredients
    async getAllIngredients() {
        try {
            const snapshot = await firestore().collection('ingredients').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            throw error;
        }
    }

    // Update an ingredient by ID
    async updateIngredient(id, updatedData) {
        try {
            await firestore().collection('ingredients').doc(id).update(updatedData);
            return true;
        } catch (error) {
            console.error('Error updating ingredient:', error);
            throw error;
        }
    }

    // Delete an ingredient by ID
    async deleteIngredient(id) {
        try {
            await firestore().collection('ingredients').doc(id).delete();
            return true;
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            throw error;
        }
    }
}

export default IngredientServices;
