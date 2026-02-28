<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UsProfile;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
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

    #[Route('/forgot-password', name: 'forgot_password', methods: ['POST'])]
    public function forgotPassword(
        Request $request,
        EntityManagerInterface $em,
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email'])) {
            return $this->json(['message' => 'Email is required'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return $this->json(['message' => 'If this email exists you will receive a reset link shortly'], 200);
        }

        // Generate token
        $token = new \App\Entity\UsToken();
        $token->setToken(bin2hex(random_bytes(32)));
        $token->setType('password_reset');
        $token->setExpiresAt(new \DateTimeImmutable('+1 hour'));
        $token->setUser($user);

        $em->persist($token);
        $em->flush();

        // Send email
        $email = (new \Symfony\Component\Mime\Email())
            ->from('noreply@lms.com')
            ->to($user->getEmail())
            ->subject('Reset your password')
            ->text('Click this link to reset your password: http://localhost:5173/reset-password/' . $token->getToken());

        $mailer->send($email);

        return $this->json(['message' => 'If this email exists you will receive a reset link shortly'], 200);
    }

    #[Route('/reset-password/{token}', name: 'reset_password', methods: ['POST'])]
    public function resetPassword(
        string $token,
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['password'])) {
            return $this->json(['message' => 'Password is required'], 400);
        }

        $usToken = $em->getRepository(\App\Entity\UsToken::class)->findOneBy([
            'token' => $token,
            'type' => 'password_reset',
            'isUsed' => false
        ]);

        if (!$usToken) {
            return $this->json(['message' => 'Invalid or already used token'], 400);
        }

        if ($usToken->getExpiresAt() < new \DateTimeImmutable()) {
            return $this->json(['message' => 'Token has expired'], 400);
        }

        $user = $usToken->getUser();
        $user->setPassword($hasher->hashPassword($user, $data['password']));

        $usToken->setIsUsed(true);

        $em->flush();

        return $this->json(['message' => 'Password reset successfully'], 200);
    }

    #[Route('/token/refresh', name: 'token_refresh', methods: ['POST'])]
    public function refresh(): JsonResponse
    {
        // This is handled by the JWT refresh token bundle firewall
        // This action should never be reached
        return $this->json(['message' => 'Token refresh failed'], 401);
    }
}