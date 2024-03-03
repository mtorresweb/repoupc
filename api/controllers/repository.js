const Repository = require("../models/Repository.js");
// eslint-disable-next-line no-unused-vars
const pagination = require("mongoose-pagination");
const {
  validateRepository,
  validateChangeStatus,
} = require("../helpers/validation.js");

//create a new Repository
const create = async (req, res) => {
  let identifiedUser = req.user;
  let repositoryData = req.body;

  //validate comment data
  let isValidRepository = validateRepository(repositoryData);
  if (!isValidRepository) {
    return res.status(400).send({
      status: "error",
      message: "Invalid repository",
    });
  }

  repositoryData.user = identifiedUser.id;

  let repository = new Repository(repositoryData);
  repository
    .save()
    .then(() => {
      return res.status(200).send({
        status: "success",
        message: "repository saved successfully",
      });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "couldn't save repository",
      });
    });
};

//gets an individual repository (only for admins)
const getRepository = async (req, res) => {
  //check if the user is an admin
  if (req.user.role != "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }

  try {
    let repository = await Repository.findById(req.params.id).select({
      __v: false,
    });
    if (!repository) {
      return res.status(404).send({
        status: "error",
        message: "couldn't get repository",
      });
    }
    res.status(200).send({
      status: "success",
      repository,
    });
  } catch {
    return res.status(500).send({
      status: "error",
      message: "couldn't get repository",
    });
  }
};

//gets an individual repository (only public repositories)
const getPublicRepository = async (req, res) => {
  try {
    let repository = await Repository.findById(req.params.id).select({
      __v: false,
    });
    if (!repository) {
      return res.status(404).send({
        status: "error",
        message: "couldn't get repository",
      });
    }
    if (repository.status != "aprobado") {
      return res.status(403).send({
        status: "error",
        message: "this repository isn't public yet",
      });
    }

    let repoToReturn = { ...repository._doc };
    delete repoToReturn.status;
    res.status(200).send({
      status: "success",
      repository: repoToReturn,
    });
  } catch {
    return res.status(500).send({
      status: "error",
      message: "couldn't get repository",
    });
  }
};

//sort repositories by their date and type, first the most recently uploaded
const listByDate = (req, res) => {
  let type = req.params.type;
  //set page
  let page = req.params.page ? req.params.page : 1;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .sort({
        created_at: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .sort({
        created_at: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their name and type
const listByName = (req, res) => {
  let type = req.params.type;
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their rate and type
const listByRate = (req, res) => {
  let type = req.params.type;
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
      type: type,
    })
      .select({
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
          type: type,
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//list on revision repositories (only for admins)
const listPendingOnes = (req, res) => {
  //check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }

  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories
  Repository.find({
    status: "creado",
  })
    .populate({
      path: "user",
      select: "nick image",
    })
    .paginate(page, itemsPerPage)
    .then((repositories) => {
      if (!repositories) {
        return res.status(404).send({
          status: "error",
          message: "no repositories found",
        });
      }

      //count documents and send response
      Repository.count({
        status: "creado",
      })
        .then((total) => {
          return res.status(200).send({
            status: "success",
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage),
            repositories,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: "Error while counting repositories",
          });
        });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "couldn't find any repository",
      });
    });
};

//approve a repository or not (only for admins)
const changeState = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }

  let status = req.body.status;
  let isValidStatus = validateChangeStatus(status);
  if (!isValidStatus) {
    return res.status(400).send({
      status: "error",
      message: "el estado debe ser 'aprobado' o 'denegado'",
    });
  }

  try {
    await Repository.findByIdAndUpdate(
      { _id: req.body.repository },
      { status: req.body.status }
    );
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error updating repository",
    });
  }

  return res.status(200).send({
    status: "success",
    message:
      "request respondida exitosamente, el estado se cambió exitosamente a: " +
      req.body.status,
  });
};

//sort repositories by their date, first the most recently uploaded
const listAllByDate = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .sort({
        created_at: "desc",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .sort({
        created_at: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their name
const listAllByName = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their rate
const listAllByRate = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({
          tags: { $in: tags },
          status: "aprobado",
        })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

const searchRepositories = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories

  Repository.find({
    status: "aprobado",
    title: { $regex: req.body.text, $options: "i" },
  })
    .select({
      status: false,
    })
    .sort({
      average_rating: "desc",
    })
    .populate({
      path: "user",
      select: "nick image",
    })
    .paginate(page, itemsPerPage)
    .then((repositories) => {
      if (!repositories) {
        return res.status(404).send({
          status: "error",
          message: "no repositories found",
        });
      }

      //count documents and send response
      Repository.count({
        status: "aprobado",
        title: { $regex: req.body.text, $options: "i" },
      })
        .then((total) => {
          return res.status(200).send({
            status: "success",
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage),
            repositories,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: "Error while counting repositories",
          });
        });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "couldn't find any repository",
      });
    });
};

const myRepositories = async (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      user: req.user.id,
    })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({ user: req.user.id })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      user: req.user.id,
    })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: "ascending" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count({ user: req.user.id })
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

module.exports = {
  myRepositories,
  create,
  listByDate,
  listByName,
  listByRate,
  listPendingOnes,
  changeState,
  getRepository,
  getPublicRepository,
  listAllByDate,
  listAllByName,
  listAllByRate,
  searchRepositories,
};
