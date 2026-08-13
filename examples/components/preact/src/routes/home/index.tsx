import style from "./style.module.css";

const Home = () => {
  return (
    <div class={style.home}>
      <h1>Welcome to Calcite Components</h1>
      <p>We even have support for TypeScript!</p>
      <calcite-dropdown
        oncalciteDropdownClose={(event) =>
          console.log(
            "closing dropdown, the following item(s) are selected",
            (event.target as HTMLCalciteDropdownElement).selectedItems,
          )
        }
      >
        <calcite-button icon-start="banana" slot="trigger">
          Sort
        </calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item>Relevance</calcite-dropdown-item>
          <calcite-dropdown-item>Date modified</calcite-dropdown-item>
          <calcite-dropdown-item>Title</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </div>
  );
};

export default Home;
