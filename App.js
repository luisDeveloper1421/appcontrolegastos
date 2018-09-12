import { StackNavigator } from 'react-navigation';
import Home from './src/Home';
import Cadastro from './src/Cadastro';
import Login from './src/Login';
import Iterna from './src/Iterna';
import Preload from './src/Preload';
import Adicionar from './src/adicionarDespesa';

const Navegador = StackNavigator ({
  Preload:{
    screen:Preload
  },
  Home:{
    screen:Home
  },
  Cadastro:{
    screen:Cadastro
  },
  Login:{
    screen:Login,
  },
  Iterna:{
    screen:Iterna,
  },
  Adicionar:{
    screen:Adicionar
  }
})

export default Navegador;
















