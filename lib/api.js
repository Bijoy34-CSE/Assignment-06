const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkoutById(id) {
  const workouts = await getWorkouts();
  return workouts.find((workout) => String(workout.id) === String(id));
}