import './App.css';
import FormulairePartenaire from './Components/FormulairePartenaire/FormulairePartenaire';
import FormulaireStagiaire from './Components/FormulaireStagiaire/FormulaireStagiaire';
import FormulaireStartup from './Components/FormulaireStartup/FormulaireStartup';

function App() {
  return (
    <div>
     <FormulaireStagiaire />
     <FormulaireStartup />
     <FormulairePartenaire />
    </div>
  );
}

export default App;
