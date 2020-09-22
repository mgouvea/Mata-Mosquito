function startGame() {
  let levelSelect = document.querySelector('#level');

  if (levelSelect.value === '') {
    alert('Selecione um nível para iniciar');
    return false;
  }

  window.location.href = `app.html?${levelSelect.value}`;
}
