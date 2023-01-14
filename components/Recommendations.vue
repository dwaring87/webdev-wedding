<script setup>
  const { getRecommendations } = useCMS();
  const recommendations = await getRecommendations();
</script>

<template>
  <div>

    <!-- Recommendations section -->
    <div v-if="recommendations">

      <!-- Category Index -->
      <div class="well mt-8">
        <h4 class="mb-2">Jump to Category:</h4>
        <div class="inline sm:flex flex-wrap gap-x-4 justify-between">
          <span class="block" v-for="(category) in Object.keys(recommendations)">
            <a :href="`#category-${category}`">{{ category }}</a>
          </span>
        </div>
      </div>

      <!-- Category Section -->
      <div v-for="(category) in Object.keys(recommendations)">

        <!-- Category Header -->
        <h2 :id="`category-${category}`">{{ category }}</h2>

        <!-- Recommendation Card -->
        <Card v-for="(rec) in recommendations[category]" :title="rec.name" class="recommendation">
          <div class="flex flex-wrap md:flex-nowrap gap-4">
            <div class="max-w-full lg:max-w-fit">
              <p v-if="rec.location">
                <strong>Location:</strong>&nbsp;
                <a :href="`https://www.google.com/maps/search/?api=1&query=${rec.location}`" target="_blank">{{ rec.location }}</a>
              </p>
              <p v-if="rec.website && rec.website.length > 0">
                <strong>Website:</strong>&nbsp;
                <span v-for="(w, i) in rec.website" class="inline-block">
                  <span v-if="i !== 0">&ensp;&bull;&ensp;</span>
                  <a :href="w.url" target="_blank">{{ w.title }}</a>
                </span>
              </p>
              <p v-if="rec.map && rec.map.length > 0">
                <strong>Map:</strong>&nbsp;
                <span v-for="(m, i) in rec.map" class="inline-block">
                  <span v-if="i !== 0">&ensp;&bull;&ensp;</span>
                  <a :href="m.url" target="_blank">{{ m.title }}</a>
                </span>
              </p>
              <br />
              <p> {{ rec.description }}</p>
            </div>
            <div class="mx-auto my-auto">
              <Image :d-id="rec.image" class="mx-auto w-max max-h-42 md:max-h-48 lg:max-h-60 lg:max-w-60" style="margin-top: 0px; margin-bottom: 0px;" width="400px" />
            </div>
          </div>
        </Card>

      </div>

    </div>

    <!-- Loading -->
    <div v-else class="text-center">
      <p class="lead">Loading...</p>
    </div>
    
  </div>
</template>

<style scoped>
  .recommendation p {
    margin: 0px;
  }
</style>