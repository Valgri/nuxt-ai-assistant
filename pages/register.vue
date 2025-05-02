<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/auth" class="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your account
          </NuxtLink>
        </p>
      </div>

      <div class="bg-white p-8 shadow rounded-lg">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <UFormGroup label="Email address" name="email">
              <UInput
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                autocomplete="email"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Password" name="password">
              <UInput
                v-model="password"
                type="password"
                required
                placeholder="Create a password"
                autocomplete="new-password"
              />
              <template #help>
                <p class="text-xs text-gray-500">At least 8 characters</p>
              </template>
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Confirm Password" name="confirmPassword">
              <UInput
                v-model="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                autocomplete="new-password"
              />
            </UFormGroup>
          </div>

          <div class="flex items-start">
            <UCheckbox
              v-model="agreeToTerms"
              name="terms"
              required
              label="I agree to the terms and conditions"
            />
          </div>

          <UButton
            type="submit"
            block
            :loading="loading"
            :disabled="loading || !isFormValid"
          >
            {{ loading ? 'Creating account...' : 'Create account' }}
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { signup, loading } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);

const isFormValid = computed(() => {
  return email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    password.value.length >= 8 &&
    agreeToTerms.value;
});

const handleRegister = async () => {
  const toast = useNuxtApp().$toast as { add: (options: { title: string; description: string; color: string }) => void };

  try {
    if (!isFormValid.value) {
      toast.add({
        title: 'Validation Error',
        description: 'Please check all form fields and try again',
        color: 'red'
      });
      return;
    }

    await signup(email.value, password.value);
    
    toast.add({
      title: 'Registration Successful',
      description: 'Please check your email to confirm your account',
      color: 'green',
    });
    
    // Redirect to confirmation page
    await router.push('/confirm');
  } catch (error: any) {
    toast.add({
      title: 'Registration Failed',
      description: error.message,
      color: 'red'
    });
  }
};

definePageMeta({
  auth: false
});
</script>