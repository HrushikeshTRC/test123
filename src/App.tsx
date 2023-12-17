import './App.css'
import "ol/ol.css";
import '@radix-ui/themes/styles.css';
import Trips from './components/trips/Trips';
import { Theme } from '@radix-ui/themes';


function App() {
  return (
    <>
      <Theme>
        <Trips />
      </Theme>
    </>
  )
}

export default App
