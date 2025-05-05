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
              <template #help>
                <p class="text-xs text-gray-500">Use gmail.com, yahoo.com, hotmail.com, or outlook.com</p>
              </template>
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

          <div v-if="formError" class="text-sm text-red-600 mb-4">
            {{ formError }}
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
import UFormGroup from '~/components/shared/UFormGroup.vue';
import UCheckbox from '~/components/shared/UCheckbox.vue';
import UInput from '~/components/shared/UInput.vue';
import UButton from '~/components/shared/UButton.vue';

const { signup, loading } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const formError = ref('');

const isFormValid = computed(() => {
  const validationResults = {
    hasEmail: Boolean(email.value.trim()),
    hasPassword: Boolean(password.value),
    passwordLength: password.value.length >= 8,
    passwordsMatch: password.value === confirmPassword.value,
    termsAccepted: agreeToTerms.value
  };

  console.log('Form validation:', validationResults);

  return validationResults.hasEmail &&
         validationResults.hasPassword &&
         validationResults.passwordLength &&
         validationResults.passwordsMatch &&
         validationResults.termsAccepted;
});

const handleRegister = async () => {
  console.log('=== Starting registration ===');
  formError.value = '';

  try {
    if (!isFormValid.value) {
      if (!email.value.trim()) {
        formError.value = 'Email is required';
      } else if (!password.value) {
        formError.value = 'Password is required';
      } else if (password.value.length < 8) {
        formError.value = 'Password must be at least 8 characters';
      } else if (password.value !== confirmPassword.value) {
        formError.value = 'Passwords do not match';
      } else if (!agreeToTerms.value) {
        formError.value = 'You must agree to the terms and conditions';
      }
      return;
    }

    console.log('Form is valid, attempting signup...');
    await signup(email.value, password.value);

    const toast = useNuxtApp().$toast as { add: (options: { title: string; description: string; color: string }) => void };
    toast.add({
      title: 'Registration Successful',
      description: 'Please check your email to confirm your account',
      color: 'green',
    });

    await router.push('/confirm');
  } catch (error: any) {
    console.error('Registration error:', error);
    formError.value = error.message;
  }
};

definePageMeta({
  auth: false
});
</script>
