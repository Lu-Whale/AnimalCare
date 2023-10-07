<template>
  <div class="pet-item">
    <van-swipe-cell>
      <van-card
        class="pet-card"
        :desc="pet.petDescription"
        :title="pet.petName"
        :thumb="`${pet.petImageAddress}`"
        centered
        @click="handlePet(String(pet.petId))"
      >
        <template #tags>
          <van-tag plain type="danger">{{ pet.category }}</van-tag>
        </template>
      </van-card>
      <template #right v-if="type === 'my'">
        <van-button
          square
          text="Delete"
          type="danger"
          class="delete-button"
          @click="handleDelete(pet.petId)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import 'vant/es/dialog/style'
import { Pet } from '@/types'
import { Dialog } from 'vant'
import { deletePetById } from '@/api/pet'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    pet: { type: Object as () => Pet, required: true },
    type: String,
  },
  emits: ['updateTable'],
  setup(props, context) {
    // const emit = defineEmits(['updateTable'])
    const handleDelete = (id: number) => {
      Dialog.confirm({
        title: 'Are you sure to delete this pet?',
        message: 'Click OK to delete this pet',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
        .then(() => {
          // on confirm
          deletePetById(id, {}).then(() => {
            context.emit('updateTable')
          })
        })
        .catch(() => {
          // on cancel
        })
    }
    const router = useRouter()
    const handlePet = (id: string) => {
      router.push({
        name: 'pet',
        params: {
          petId: id,
        },
      })
    }
    return {
      handlePet,
      handleDelete,
    }
  },
})
</script>

<style scoped lang="less">
.pet-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
