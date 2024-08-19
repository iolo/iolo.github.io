(function (document, localStorage) {
  const root = document.documentElement;
  const themeCheck = document.getElementById('themeCheck');

  function setTheme(theme) {
    switch (theme) {
      case 'light':
        root.classList.remove('dark-theme');
        root.classList.add('light-theme');
        break;
      case 'dark':
        root.classList.remove('light-theme');
        root.classList.add('dark-theme');
        break;
    }
    localStorage.setItem('theme', theme);
  }
  themeCheck.addEventListener('change', (e) => setTheme(e.target.checked ? 'dark' : 'light'));

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const savedTheme = localStorage.getItem('theme') || systemTheme;
  themeCheck.checked = (savedTheme === 'dark');
  setTheme(savedTheme);
})(document, localStorage);
