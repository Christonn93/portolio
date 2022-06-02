function cardFactory(className, child, image) {
    const card = document.createElement("div");
    card.classList.add(className);
    card.style = `background-image: url(${image})`;
    card.append(child);
    return card;
  }
  
  function cardContent(title, content, url, gitUrl, image) {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
  
    const cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = title;
  
    const cardContent = document.createElement("p");
    cardContent.classList.add("card-content");
    cardContent.innerHTML = content;
  
    const siteLink = document.createElement("a");
    siteLink.classList.add("btn");
    siteLink.innerText = "The site";
    siteLink.href = url;
    siteLink.target = "_blank";

    const gitRepoLink = document.createElement("a");
    gitRepoLink.classList.add("btn");
    gitRepoLink.innerText = "Github Repo";
    gitRepoLink.href = gitUrl;
    gitRepoLink.target = "_blank";
  
    const cardController = document.createElement("div");
    cardController.classList.add("card-controller")
    cardController.append(gitRepoLink, siteLink)

    cardBody.append(cardTitle, cardContent, cardController);
    return cardBody;
  }

  const cardContainer = document.querySelector(".card-container");
  
  async function fetchCardInfo() {
    try {
      const data = await fetch("./app/js/utils/projects.json");
      const jsonData = await data.json();
  
      jsonData.forEach((e) => {
        const title = e.title;
        const url = e.page_url;
        const gitUrl = e.repo_url;
        const image = e.image;
        const content = e.content;
  
        cardContainer.append(
          cardFactory("card", cardContent(title, content, url, gitUrl), image)
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
  fetchCardInfo();