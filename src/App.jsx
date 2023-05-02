import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);
import Meal from "./components/Meal";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-deliveroo--jtzszzwtjhkl.code.run/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="app">
      <header>
        <div>
          <img src="./src/assets/Images/logo-teal.svg" alt="logo" />
        </div>
      </header>
      <section className="sectionheader">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src="./src/assets/Images/header-image.jpg" alt="pain et soupe" />
      </section>
      <main>
        <div className="blocprincipal">
          <section className="colonneleft">
            {data.categories.map((elem) => {
              if (elem.meals.length !== 0) {
                return (
                  <div key={elem.name}>
                    <h2>{elem.name}</h2>
                    <div className="blocdetail">
                      {elem.meals.map((meal) => {
                        return (
                          <Meal
                            key={meal.id}
                            meal={meal}
                            panier={panier}
                            setPanier={setPanier}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="colonneright">
            <div>
              <button>Valider mon panier</button>
              {panier.map((elem) => {
                return (
                  <div key={elem.plat}>
                    <p>{elem.plat}</p>
                    <p>{elem.quantite}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
