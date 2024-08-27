import { ProgressSpinner } from "primereact/progressspinner";

const LoadingSpinner = () => {
  return (
    <div className="card flex justify-content-center items-center h-[50vh] !z-20">
      <ProgressSpinner
        pt={{
          circle: {
            style: { stroke: "#A3EA2A", strokeWidth: 3, animation: "none" },
          },
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
