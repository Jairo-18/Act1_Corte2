import React, { useEffect, useState } from 'react';
import './App.css';
import image from './assets/bg-cafe.jpg';

function App() {

  const [colorBotones, setColorBotones] = useState({ boton2: '#6e7c80', boton3: '#1B1D1F' });
  const alternarColoresBotones = () => {
    setColorBotones({ boton2: colorBotones.boton3, boton3: colorBotones.boton2 });
  };
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json'); // Reemplaza la URL con tu URL de productos
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='primera_caja'>
      <img src={image} className="caffe_imagen" alt="Coffe img" />
      <div className='segunda_caja'>
        <div className='contenedor_de_texto imagen_titulo'>
          <h1 className='titulo1'>
            Our collection
          </h1>
          <p className='texto1'>Introducing our Coffee Collection, a selection of unique coffees <br />
            from different roast types and origins, expertly roasted in small <br />
            batches and shipped fresh weekly.
          </p>
        </div>
        <div className='tercera_caja'>
          <div className='cuarta_caja'>
            <div className="boton1">
              <button
                className="boton2"
                style={{ backgroundColor: colorBotones.boton2 }}
                onClick={alternarColoresBotones}
              >
                All Products
              </button>
              <button
                className="boton3"
                style={{ backgroundColor: colorBotones.boton3 }}
                onClick={alternarColoresBotones}
              >
                Available Now
              </button>
            </div>
          </div>
          <div className='quinta_caja'>
            {productos.map(producto => (
              <div key={producto.id} className='productos'>
                <img src={producto.image} className='imagen_producto' />
                {producto.popular && <p className='popular_producto'>{producto.popular} Popular</p>}
                <div className='flexs1'>
                  <span className='nombre_producto'>{producto.name}</span>
                  <button className='precio_producto'>{producto.price}</button>
                </div>
                <div className='flexs2'>
                  {producto.rating >1 ? (
                    <img src="../assets/Star_fill.svg" className='estrella1'/>
                  ) : (
                    <img src="../assets/Star.svg" className='estrella2'/>
                  )}
                  <p className='puntaje'>{producto.rating}</p>
                  {producto.votes ? <p className='votos'>({producto.votes} votes)</p> : <p className='votos'>No ratings</p>}
                  <p className='available'>{!producto.available ? 'Sould out' : ' '}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
