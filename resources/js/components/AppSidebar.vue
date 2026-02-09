<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavAdmin from '@/components/NavAdmin.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/ucp';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import { BookOpen, Home, LayoutGrid, User, Car, Shield, Users, FileText } from 'lucide-vue-next';
import { computed } from 'vue';
import AppLogo from './AppLogo.vue';

const page = usePage();
const userGroup = computed(() => (page.props.auth as any)?.group || 'user');

const mainNavItems = computed<NavItem[]>(() => {
    return [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Spieler Information',
            href: '/ucp/player-info',
            icon: User,
        },
        {
            title: 'Fahrzeuge',
            href: '/ucp/vehicle-info',
            icon: Car,
        },
    ];
});

const adminNavItems = computed<NavItem[]>(() => {
    // Zeige Admin-Bereich nur, wenn Gruppe != "user"
    if (userGroup.value === 'user') {
        return [];
    }

    const items: NavItem[] = [
        {
            title: 'Administrativ',
            href: '/ucp/admin',
            icon: Shield,
        },
        {
            title: 'Rollen',
            href: '/ucp/admin/roles',
            icon: Users,
        },
    ];

    // Wiki Admin Link nur für wikiadmin oder admin
    if (userGroup.value === 'wikiadmin' || userGroup.value === 'admin') {
        items.push({
            title: 'Wiki Verwaltung',
            href: '/wiki/admin',
            icon: FileText,
        });
    }

    return items;
});

const footerNavItems: NavItem[] = [
    {
        title: 'Startseite',
        href: '/',
        icon: Home,
    },
    {
        title: 'Wiki',
        href: '/wiki',
        icon: BookOpen,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
            <NavAdmin v-if="adminNavItems.length > 0" :items="adminNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
