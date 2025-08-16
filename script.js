 const container = document.getElementById("links-container");
      const addLinkBtn = document.getElementById("add-link-btn");

      // Adicionar novo link
      addLinkBtn.addEventListener("click", function () {
        const newLinkItem = document.createElement("div");
        newLinkItem.className = "link-item flex gap-2";
        newLinkItem.innerHTML = `
        <select class="flex-1 p-3 bg-[#1e1e1e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 custom-select">
            <option value="">Selecione o tipo de link</option>
            <option value="portfolio">Portfólio</option>
            <option value="github">GitHub</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="dribbble">Dribbble</option>
        </select>
        <input type="url" class="flex-1 p-3 bg-[#1e1e1e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100" placeholder="Insira o link aqui...">
        <button type="button" class="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md remove-link">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
        container.appendChild(newLinkItem);
      });

      // Remover link
      container.addEventListener("click", function (e) {
        if (e.target.closest(".remove-link")) {
          e.target.closest(".link-item").remove();
        }
      });

      // Form submission
      document
        .getElementById("candidatura-form")
        .addEventListener("submit", async function (e) {
          e.preventDefault();

          const formData = new FormData();

          // Campos de texto
          formData.append("nome", document.getElementById("nome").value);
          formData.append("email", document.getElementById("email").value);
          formData.append(
            "telefone",
            document.getElementById("telefone").value
          );
          formData.append("salario", document.getElementById("salario").value);
          formData.append("cargo", document.getElementById("cargo").value);

          // Coletar links
          const links = [];
          document.querySelectorAll(".link-item").forEach((item) => {
            const type = item.querySelector("select").value;
            const url = item.querySelector('input[type="url"]').value;
            if (type && url) {
              links.push({ type, url });
            }
          });
          formData.append("links", JSON.stringify(links));

          // Coletar currículo (binário)
          const curriculoFile = document.getElementById("curriculo").files[0];
          if (curriculoFile) {
            formData.append("curriculo", curriculoFile);
          }

          try {
            const response = await fetch(
              "https://n8n.chagassilva.com/webhook/form",
              {
                method: "POST",
                body: formData, // NÃO definir Content-Type aqui
              }
            );

            if (response.ok) {
              //   alert("Candidatura enviada com sucesso!");
              Toastify({
                text: "Formulário enviado com sucesso!",
                duration: 3000, // tempo em ms
                gravity: "top", // top ou bottom
                position: "right", // left, center ou right
                backgroundColor: "linear-gradient(to right, #9435f0, #9334ea)",
                stopOnFocus: true, // para não fechar se o mouse estiver em cima
              }).showToast();

              this.reset();
            } else {
              throw new Error("Erro ao enviar candidatura");
            }
          } catch (error) {
            console.error("Erro:", error);
            alert(
              "Houve um erro ao enviar sua candidatura. Tente novamente mais tarde."
            );
          }
        });