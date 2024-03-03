import axios from "axios";

const user = axios.create({
  baseURL: "http://127.0.0.1:3000/api/user",
});
const repository = axios.create({
  baseURL: "http://127.0.0.1:3000/api/repository",
});

export async function getAvatar(token, file) {
  try {
    let response = await user.get(`/avatar/${file}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener el avatar");
    console.log(e);
  }
}

export async function updateUser(token, userToUpdate) {
  try {
    console.log(userToUpdate);
    let response = await user.put("/update", userToUpdate, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo actualizar el usuario");
    console.log(e);
  }
}

export async function listRepoByRate(token, type, page) {
  try {
    let response = await repository.get(`/listByRate/${type}/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listRepoByName(token, type, page) {
  try {
    let response = await repository.get(`/listByName/${type}/${page}}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listRepoByDate(token, type, page) {
  try {
    let response = await repository.get(`/listByDate/${type}/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listAllRepoByDate(token, page) {
  try {
    let response = await repository.get(`/listAllByDate/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listAllRepoByRate(token, page) {
  try {
    let response = await repository.get(`/listAllByRate/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listAllRepoByName(token, page) {
  try {
    let response = await repository.get(`/listAllByName/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function searchRepositories(token, page, text) {
  try {
    let response = await repository.post(
      `/searchByName/${page}`,
      { text },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function changeUserStatus(token) {
  try {
    let response = await user.put(
      "/changeStatus",
      {},
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (e) {
    alert("no se pudo actualizar el usuario");
    console.log(e);
  }
}

export async function createRepository(token, repo) {
  try {
    let response = await repository.post("/create", repo, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo crear el repositorio");
    console.log(e);
  }
}

export async function getMyRepositories(token, page) {
  try {
    let response = await repository.get(`/mine/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function listPendingRepositories(token, page) {
  try {
    let response = await repository.get(`/listPending/${page}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo obtener los repositorios");
    console.log(e);
  }
}

export async function changeRepoStatus(token, status) {
  try {
    let response = await repository.put(`/changeStatus`, status, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (e) {
    alert("no se pudo actualizar el repositorio");
    console.log(e);
  }
}
