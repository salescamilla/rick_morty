import { useState, useEffect } from "react";

function App() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");
  const [especie, setEspecie] = useState("");
  const [genero, setGenero] = useState("");
  const [origem, setOrigem] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [criacao, setCriacao] = useState("");
  const [episodios, setEpisodios] = useState("");
  const [image, setImage] = useState("");

  const fetchCharacter = async (id) => {
    try {
      const url = `https://rickandmortyapi.com/api/character/${id}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Personagem não encontrado");

      const data = await response.json();

    
      const episodeNumbers = data.episode.map(ep => ep.split('/').pop()).join(', ');
      const episodeText = `PARTICIPA DE: ${episodeNumbers}`;

      setNome(data.name);
      setStatus(data.status);
      setEspecie(data.species);
      setGenero(data.gender);
      setOrigem(data.origin.name);
      setLocalidade(data.location.name);
      setCriacao(data.created);
      setEpisodios(episodeText);
      setImage(data.image);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  const handlePrevious = () => {
    const newId = parseInt(id) - 1;
    if (newId > 0) {
      setId(newId.toString());
      fetchCharacter(newId);
    }
  };

  const handleNext = () => {
    const newId = parseInt(id) + 1;
    setId(newId.toString());
    fetchCharacter(newId);
  };

  useEffect(() => {
    fetchCharacter(1);
    setId("1");
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          {image && <img alt={nome} style={{ width: "100%" }} src={image} className="rounded" />}
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); fetchCharacter(id); }}>
                <div className="mb-3">
                  
                  <label htmlFor="id" className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    placeholder="EX: 1"
                    value={id}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary"> BUSCAR </button>

                <button type="button" className="btn btn-secondary mx-2" onClick={handlePrevious}> ANTERIOR </button>

                <button type="button" className="btn btn-secondary" onClick={handleNext}> PRÓXIMO </button>

                <div className="mb-3">
                  <label htmlFor="Nome" className="form-label"> NOME </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Nome"
                    placeholder="EX: Nome"
                    readOnly
                    value={nome}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Status" className="form-label"> STATUS </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Status"
                    placeholder="EX: Status"
                    readOnly
                    value={status}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Especie" className="form-label"> ESPÉCIE </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Especie"
                    placeholder="EX: Especie"
                    readOnly
                    value={especie}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Genero" className="form-label"> GÊNERO </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Genero"
                    placeholder="EX: Genero"
                    readOnly
                    value={genero}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Origem" className="form-label"> ORIGEM </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Origem"
                    placeholder="EX: Origem"
                    readOnly
                    value={origem}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Localidade" className="form-label"> LOCALIDADE </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Localidade"
                    placeholder="EX: Localidade"
                    readOnly
                    value={localidade}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Criacao" className="form-label"> CRIAÇÃO </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Criacao"
                    placeholder="EX: Criacao"
                    readOnly
                    value={criacao}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Episodios" className="form-label"> EPISÓDIOS </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Episodios"
                    placeholder="EX: Episodios"
                    readOnly
                    value={episodios}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;