<script setup>
  const { getRecommendations } = useCMS();
  const recommendations = await getRecommendations();
</script>

<template>
  <div>

    <!-- Category Index -->
    <div class="well mt-8">
      <h4 class="mb-2">Jump to Category:</h4>
      <div class="inline sm:flex flex-wrap gap-x-4 justify-between">
        <span class="block" v-for="(category) in Object.keys(recommendations)">
          <a :href="`#category-${category}`">{{ category }}</a>
        </span>
      </div>
    </div>

    <div v-if="recommendations" v-for="(category) in Object.keys(recommendations)">

      <!-- Category Header -->
      <h2 :id="`category-${category}`">{{ category }}</h2>

      <!-- Recommendation Card -->
      <Card v-for="(rec) in recommendations[category]" :title="rec.name" class="recommendation">
        <div class="flex flex-wrap md:flex-nowrap gap-4 items-center">
          <div class="max-w-full lg:max-w-sm">
            <p v-if="rec.location">
              <strong>Location:</strong>&nbsp;
              <a :href="`https://www.google.com/maps/search/?api=1&query=${rec.location}`" target="_blank">{{ rec.location }}</a>
            </p>
            <p v-if="rec.website && rec.website.length > 0">
              <strong>Website:</strong>
              <ul>
                <li v-for="(w) in rec.website"><a :href="w.url" target="_blank">{{ w.title }}</a></li>
              </ul>
            </p>
            <p v-if="rec.map && rec.map.length > 0">
              <strong>Map:</strong>
              <ul>
                <li v-for="(m) in rec.map"><a :href="m.url" target="_blank">{{ m.title }}</a></li>
              </ul>
            </p>
            <br />
            <p> {{ rec.description }}</p>
          </div>
          <div class="mx-auto">
            <Image :d-id="rec.image" class="mx-auto w-max max-h-42 md:max-h-48 lg:max-w-sm lg:max-h-fit" width="400px" />
          </div>
        </div>
      </Card>

    </div>
  </div>
</template>

<style scoped>
  .recommendation p {
    margin: 0px;
  }
  .recommendation ul {
    list-style: disc;
    margin-left: 40px;
  }
</style>