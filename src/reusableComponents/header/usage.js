/*
// Basic usage
<AppHeader title="Profile" />

// Custom back navigation
<AppHeader 
  title="Settings" 
  onGoBack={() => customBackHandler()} 
/>

// Hide back button
<AppHeader 
  title="Home" 
  showBackButton={false} 
/>

// Add a right component
<AppHeader 
  title="Notifications" 
  rightComponent={
    <TouchableOpacity onPress={handleEdit}>
      <Feather name="edit" size={20} />
    </TouchableOpacity>
  } 
/>

*/