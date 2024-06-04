import { Header } from "../../components/Header/Header";
import background from "../../assets/background.png"
import ItemList from "../../components/ItemList/index"
import './styles.css'
import { useState } from "react";


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, login, name, bio } = newUser
      setCurrentUser({ avatar_url, login, name, bio })
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="conteudo">
        <img className="background" src={background} alt="background-app" />
        <div className="info">
          <div>
            <input name="usuario"
              value={user}
              onChange={event => setUser(event.target.value)}
              placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (<>
            <div className="perfil">
              <img className="profile" src={currentUser.avatar_url} alt="imagem github" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />
          </>) : null}
          {repos?.length ? (
            <>
              <div>
                <h4 className="repositorio">Repositórios</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description} />
                ))}
              </div>
            </>) : null}

        </div>
      </div>
    </div>
  );
}

export default App;
