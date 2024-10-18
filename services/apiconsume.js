module.exports = {
    'findAll': async () => {
        try {
            const baseUrl = 'https://api-dishes.vercel.app/'
            const response = await fetch(baseUrl)
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`)
            }
            const data = await response.json()
            return data.data
        } catch (e) {
            console.error(e)
            throw e
        }
    },
    'findById': async (id) => {
        try {
            const response = await fetch(`https://api-dishes.vercel.app/${id}`)
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`)
            }

            const data = await response.json()
            return data.data
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    'addDish': async (newDish) => {
        try {
            const response = await fetch('https://api-dishes.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDish)
            })

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`)
            }
            const data = await response.json()
            return data.data
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    'editDish': async (id, updatedDish) => {
        try {
            const response = await fetch(`https://api-dishes.vercel.app/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDish),
            });

            if (!response.ok) {
                throw new Error(`Error en la actualización: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    'deleteDish': async (id) => {
        try {
            const response = await fetch(`https://api-dishes.vercel.app/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la eliminación: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}
