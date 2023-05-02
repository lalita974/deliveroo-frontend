import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meal = (props) => {
  const { id, meal, panier, setPanier } = props;
  return (
    <div
      key={meal.id}
      className="sousbloc"
      onClick={() => {
        const newTab = [...panier];
        newTab.push({ plat: meal.title, quantite: 1 });
        setPanier(newTab);
      }}
    >
      <article>
        <h3>{meal.title}</h3>
        <p className="description">{meal.description}</p>
        <div className="price-popular">
          <p className="price">{meal.price} €</p>
          {meal.popular && (
            <p className="popular">
              <FontAwesomeIcon icon="star" />
              Populaire
            </p>
          )}
        </div>
      </article>
      {meal.picture && <img src={meal.picture} alt={meal.name} />}
    </div>
  );
};

export default Meal;
