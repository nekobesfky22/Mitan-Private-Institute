document.getElementById('startBtn').addEventListener('click', () => {
    location.href = 'index.html';
  });


   // === RENDER FUNCTION ===
    const grid = document.getElementById('bookGrid');
    const deptButtons = document.querySelectorAll('.filter-btn');
    const stageButtons = document.querySelectorAll('.stage-btn');

    let currentDept = 'all';
    let currentStage = 'all';

    function renderBooks() {
      grid.innerHTML = '';
      const filtered = books.filter(b =>
        (currentDept === 'all' || b.department === currentDept) &&
        (currentStage === 'all' || b.stage === currentStage)
      );

      if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;font-size:1.2em;color:#666;">No books found for this selection.</p>`;
        return;
      }

      filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="thumb" style="background-image:url('${book.thumb}')"></div>
          <div class="info">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="tags">Dept: ${book.department.replace('-', ' ')} | Stage ${book.stage}</div>
          </div>
          <div class="buttons">
            <a href="${book.pdf}" target="_blank" class="btn">View PDF</a>
            <a href="${book.pdf}" download class="btn">Download</a>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    deptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        deptButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDept = btn.dataset.dept;
        renderBooks();
      });
    });

    stageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        stageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStage = btn.dataset.stage;
        renderBooks();
      });
    });

    renderBooks();