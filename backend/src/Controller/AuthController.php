<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UsProfile;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Basic validation
        if (empty($data['email']) || empty($data['password']) || empty($data['firstName']) || empty($data['lastName']) || empty($data['role'])) {
            return $this->json(['message' => 'Missing required fields'], 400);
        }

        // Check role is valid
        if (!in_array($data['role'], ['ROLE_STUDENT', 'ROLE_PROFESSOR'])) {
            return $this->json(['message' => 'Invalid role'], 400);
        }

        // Check email not already used
        $existing = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existing) {
            return $this->json(['message' => 'Email already in use'], 409);
        }

        // Create user
        $user = new User();
        $user->setEmail($data['email']);
        $user->setRoles([$data['role']]);
        $user->setPassword($hasher->hashPassword($user, $data['password']));

        // Create profile
        $profile = new UsProfile();
        $profile->setFirstName($data['firstName']);
        $profile->setLastName($data['lastName']);
        $profile->setPhone($data['phone'] ?? null);
        $profile->setUser($user);

        $user->setProfile($profile);

        $em->persist($user);
        $em->persist($profile);
        $em->flush();

        return $this->json(['message' => 'Registration successful, your account is pending approval'], 201);
    }
}