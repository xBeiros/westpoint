<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/routes';
import { dashboard } from '@/routes/ucp';
import type { User } from '@/types';
import { Link, router, useForm } from '@inertiajs/vue3';
import { LayoutGrid, LogOut } from 'lucide-vue-next';

interface Props {
    user: User;
}

const logoutForm = useForm({});
const handleLogout = () => {
    logoutForm.post(logout.url(), {
        onFinish: () => {
    router.flushAll();
        },
    });
};

defineProps<Props>();
</script>

<template>
    <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo :user="user" :show-email="true" />
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem as-child>
        <Link
            :href="dashboard()"
            class="flex w-full items-center text-left"
        >
            <LayoutGrid class="mr-2 h-4 w-4" />
            Dashboard
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem as-child>
        <button
            class="flex w-full items-center text-left"
            @click="handleLogout"
            data-test="logout-button"
            :disabled="logoutForm.processing"
        >
            <LogOut class="mr-2 h-4 w-4" />
            Ausloggen
        </button>
    </DropdownMenuItem>
</template>
