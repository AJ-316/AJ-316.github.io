import CircuitLines from "./components/CircuitLines";

const App = () => {
  return (
    <main className="port-bg-gradient h-screen w-screen">

      <div className="absolute w-full h-full" >
        <CircuitLines />
      </div>

      <div className="flex items-center justify-center">
        <h1 className="text-white p-19 font-[Montserrat]">
          <p className="text-3xl font-thin">Hi, I'm</p>
          <p className="text-7xl">Advaitya Jadhav</p>
        </h1>
      </div>
     
    </main>
  );
};

export default App;
