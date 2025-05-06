// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
  // Smooth Scroll for Navbar Links & Active Class
  document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
          const activeItem = document.querySelector('.nav-item.active');
          if (activeItem) activeItem.classList.remove('active');  // Remove previous active
          item.classList.add('active');  // Add active class to clicked item
      });
  });

  // Hover effect for movies
  document.querySelectorAll('.movie').forEach(movie => {
      movie.addEventListener('mouseenter', () => {
          movie.classList.add('hovered');
      });
      movie.addEventListener('mouseleave', () => {
          movie.classList.remove('hovered');
      });
  });

});
